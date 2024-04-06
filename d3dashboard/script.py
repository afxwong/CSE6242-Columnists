import json
import sys
import pandas as pd

def main():
    # sys.stdout.reconfigure(buffering=0)
    # Define some data
    # data = {
    #     "message": "Hello from Python!",
    #     "values": [1, 2, 3, 4, 5],
    #     "arg": sys.argv[1]
    # }
    
    # # Convert data to JSON format
    # json_data = json.dumps(data)
    
    url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
    data = pd.read_csv(url)
    # Print JSON data
    json_data = data.to_json()
    print(json_data)

if __name__ == "__main__":
    main()