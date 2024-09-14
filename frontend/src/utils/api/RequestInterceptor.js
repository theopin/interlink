
async function refreshAccessToken (instance) {
    try {
      const refreshResponse = await instance.post('/auth/access', {
        refreshToken: sessionStorage.getItem('refreshToken') // Assuming you store refreshToken in sessionStorage
      })
  
      const newAccessToken = refreshResponse.data.data.accessToken
  
      // Update the accessToken with the new access token
      sessionStorage.setItem('accessToken', newAccessToken)
  
      return await instance.request(refreshResponse.config)
    } catch (error) {
      console.error('Error refreshing access token:', error)
      throw error // Propagate the error
    }
};
  
async function setRequestInterceptor (instance) {
    instance.interceptors.request.use(
        function (config) {
        // Check if accessToken is present
        const sessionCookie = sessionStorage.getItem('accessToken')

            if (sessionCookie !== null && sessionCookie !== undefined) {
                config.headers.Authorization = `Bearer ${sessionCookie}`
            }

            return config
        },
        async function (error) {
        return await Promise.reject(error)
        }
    )
}

function decodeToken (jwtToken) {
    const payloadBase64 = jwtToken.split('.')[1]

    // Decode the base64-encoded payload
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8')

    return JSON.parse(payloadJson)
}

async function setResponseInterceptor (instance) {
    instance.interceptors.response.use(
        function (response) {
        return response
        },
        async function (error) {
        const originalRequest = error.config

        // Check if the error is due to an expired access token (401 Unauthorized)
        if (error.response.status === 401 && (originalRequest._retry === null || originalRequest._retry === undefined)) {
            originalRequest._retry = true

            const refreshToken = sessionStorage.getItem('refreshToken')
            if (refreshToken !== null && refreshToken !== undefined) {
            try {
                const decodedToken = decodeToken(refreshToken)

                // Refresh token has expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    sessionStorage.removeItem('accessToken')
                    sessionStorage.removeItem('refreshToken')

                    // Redirect to login or perform any other action needed
                    // const navigate = useNavigate()
                    //navigate('/welcome')
                    return await Promise.reject(error)
                }

                const refreshedResponse = await refreshAccessToken(instance)

                // Retry the original request with the new access token
                return await instance.request(refreshedResponse.config)
            } catch (refreshError) {
                console.error('Error refreshing access token:', refreshError)

                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('refreshToken')

                // Redirect to login or perform any other action needed
                window.location.href = '/login'
                //const navigate = useNavigate()
                // navigate('/welcome')
                return await Promise.reject(refreshError)
            }
            }
        }

        return await Promise.reject(error)
        }
    )
}

export const RequestInterceptor = {
    setRequestInterceptor,
    setResponseInterceptor
}