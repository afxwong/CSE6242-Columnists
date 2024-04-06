import json
import sys
def main():
    # Define some data
    data = {
        "message": "Hello from Python!",
        "values": [1, 2, 3, 4, 5],
        "arg": sys.argv[1]
    }
    
    # Convert data to JSON format
    json_data = json.dumps(data)
    
    # Print JSON data
    print(json_data)

if __name__ == "__main__":
    main()