import Roboflow from roboflow

# this func use the model to calculate the percentage of space-empty in a parking lot
def predict_percentage(model, img):
    a = model.predict(img, confidence=40, overlap=30).json()
    perc = 0
    for i in a['predictions']:
        if i['class'] == 'space-empty':
            perc += 1
    return perc / len(a['predictions'])

with open('private_api_key.txt', 'r') as file:
    # Read a single line from the file
    line = file.readline()

rf = Roboflow(api_key=line) # publishable api key
project = rf.workspace().project("pklot-1tros")
model = project.version(2).model

img = ""
print(predict_percentage(model, img))