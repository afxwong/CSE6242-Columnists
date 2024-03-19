import json

def main():
    # Define some data
    data = {
        "message": "Hello from Python!"
    }
    
    # Convert data to JSON format
    json_data = json.dumps(data)
    
    # Print JSON data
    print(json_data)

if __name__ == "__main__":
    main()