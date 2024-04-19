import json
import sys
import pandas as pd
import random
from PIL import Image
import string
from transformers import CLIPProcessor, CLIPModel
from transformers import logging
import torch 
import torch.nn as nn
import numpy as np
import os
class HumorRatingNN(nn.Module):
    def __init__(self):
        super(HumorRatingNN, self).__init__()
        
        self.fc1 = nn.Linear(1024, 512) # 1024 inputs (512 from image + 512 from caption), to 512 outputs
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(512, 256)  # 512 inputs to 256 outputs
        self.fc3 = nn.Linear(256, 1)    # 256 inputs to 1 output (your mean humor rating)
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)  # No activation here, as we're predicting a continuous value
        return x

def main():
    
    caption = sys.argv[1]
    rating_model_path = "./models/humor_rating_model.pth"
    clip_processor_path = "./models/clip_processor"
    clip_model_path = "./models/clip_model"
    cap_data_dir = "../data_vis/caption_data"
    tsne_data_dir = "./tsne"
    img_data_dir = "./cartoons"

    # Get caption embedding
    img_id = sys.argv[2]
    # print("caption: ", caption, ", img_id: ", img_id)
    img_path = os.path.join(img_data_dir, f"{img_id}.jpg")
    clip_processor = CLIPProcessor.from_pretrained(clip_processor_path)
    clip_model = CLIPModel.from_pretrained(clip_model_path)
    img = Image.open(img_path)
    inputs = clip_processor(text=[caption], images=img, return_tensors="pt", padding=True)
    outputs = clip_model(**inputs)
    img_embeds = outputs.image_embeds.detach().numpy()
    cap_embeds = outputs.text_embeds.detach().numpy()

    # Get Top k neighbors; loading cap_df first

    cap_data_df = pd.read_pickle(os.path.join(cap_data_dir, f"cap_df_{img_id}.pkl"))
    # print(cap_data_df.head(),"\n", len(cap_data_df.index))
    cap_data_df["similarity"] = np.linalg.norm(np.array(cap_data_df["cap_feat"].to_list()) - cap_embeds, axis=1)
    k = 5
    top_k = cap_data_df.sort_values(by=["similarity"], ascending=False)[:k]
    top_k = top_k[["similarity"]]
    weight_total = top_k.sum()
    top_k["weight"] = top_k[["similarity"]]/weight_total

    # Get weighted average of TSNE for top_k to provided caption

    tsne_data_df = pd.read_json(os.path.join(tsne_data_dir, f"{img_id}.json")).iloc[top_k.index]
    result_dict = {}
    result_dict["X"] = tsne_data_df["X"].dot(top_k["weight"])
    result_dict["Y"] = tsne_data_df["Y"].dot(top_k["weight"])

    # Get score of caption
    rating_model = HumorRatingNN()
    rating_model.load_state_dict(torch.load(rating_model_path, map_location=torch.device('cpu')))
    rating_model.eval()
    X = np.hstack([np.vstack(img_embeds), np.vstack(cap_embeds)])
    pred_score = rating_model(torch.from_numpy(X))
    result_dict["mean"] = pred_score.item() * 2 # mean for consistency
    print(result_dict)

if __name__ == "__main__":
    main()