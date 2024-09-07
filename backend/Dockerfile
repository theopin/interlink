# Use an official lightweight Alpine image with Python
FROM python:3.11-alpine

# Set the working directory in the container
WORKDIR /app


# Install the required dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY /src .

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

# Add a health check to the Docker container
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:5000/health/status || exit 1

# Command to run the Flask application
CMD ["flask", "run"]