
import nltk
from nltk.stem.porter import PorterStemmer
import ast

ps = PorterStemmer()
import ast
def convert(obj):
    L = []
    
    for i in ast.literal_eval(obj):
        L.append(i["name"])
        
    return L


def extract(obj):
 
    counter = 0
    L = []
    for i in ast.literal_eval(obj):
        if counter != 3:
            L.append(i["name"])
            counter += 1
        else:
            break
    return L


def fetch_director(obj):
    # Get director name from crew.
    L = []
    for i in ast.literal_eval(obj):
        if i["job"] == "Director":
            
            L.append(i["name"])
    return L


def stem(text):
    # Apply Porter stemming to each token in a string.
    y = []
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)
