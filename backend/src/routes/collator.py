import os
import importlib

def collate_routes(app):

    for filename in os.listdir('routes'):
        if filename.endswith('_route.py'):
            # Get the module name without '.py'
            module_name = filename[:-3]
            print(module_name)
            
            # Dynamically import the module
            module = importlib.import_module(f'routes.{module_name}')
            
            # Get the blueprint attribute (assumes each route module has a blueprint named '<module_name>_blueprint')
            blueprint = getattr(module, f'{module_name[:-6]}_blueprint')
            
            # Register the blueprint with the Flask app
            app.register_blueprint(blueprint)