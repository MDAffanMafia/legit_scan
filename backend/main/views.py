from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from .models import User
from rest_framework.response import Response
from  rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from django.http import HttpResponse,JsonResponse
from  .import ml_model
from rest_framework.response import Response
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from django.middleware.csrf import get_token
import base64
import io
import json


# Create your views here.
#the training model function
def train_model():
    # Load and preprocess the dataset for training and validation
    train_data_dir = "basedata/training/"
    validation_data_dir = "basedata/validation/"
    input_size = (200, 200)
    batch_size = 32
    num_epochs = 10

    train_datagen = ImageDataGenerator(rescale=1/255)
    validation_datagen = ImageDataGenerator(rescale=1/255)
    
    train_generator = train_datagen.flow_from_directory(
        train_data_dir,
        target_size=input_size,
        batch_size=batch_size,
        class_mode='binary'
    )

    validation_generator = validation_datagen.flow_from_directory(
        validation_data_dir,
        target_size=input_size,
        batch_size=batch_size,
        class_mode='binary'
    )
    # Model architecture (you can customize this as needed)
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(16, (3, 3), activation='relu', input_shape=(input_size[0], input_size[1], 3)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')  # 1 neuron for binary classification
    ])
    # Compile the model
    model.compile(
        loss="binary_crossentropy",
        optimizer=tf.keras.optimizers.RMSprop(learning_rate=0.001),
        metrics=["accuracy"]
    )
    train_dataset=train_datagen.flow_from_directory("basedata/training/",target_size=(200,200),batch_size=3,class_mode='binary')
    validation_dataset=validation_datagen.flow_from_directory("basedata/validation/",target_size=(200,200),batch_size=3,class_mode='binary')
    model.fit(
        train_dataset,
        steps_per_epoch=3,
        epochs=10,
        validation_data=validation_dataset
    )

    # Save the trained model
    model.save("counterfeit_model.h5")
    
#the training model funtion ends here
#the load_model_prediction funtion starts here
def load_model_and_predict(image_data):
   model = tf.keras.models.load_model("counterfeit_model.h5")

    # Read the image data from the binary stream and convert it to a format compatible with the model
   #img = tf.image.decode_jpeg(image_data, channels=3)
   img=image_data
   img = tf.image.resize(img, [200, 200])
   img_array = img_to_array(img)
   img_array = np.expand_dims(img_array, axis=0)
   img_array = preprocess_input(img_array)

    # Make the prediction
   prediction = model.predict(img_array)

    # Return the prediction result (e.g., True for counterfeit, False for genuine)
   return prediction[0][0] >= 0.5
#the load_model_prediction funtion ends here
#the upload image function starts here
def upload_image(request):
     if request.method == 'POST' and request.FILES['image']:
        image_file = request.FILES['image']
        
        # Save the image file to a directory
        with open('basedata/training/image.jpg', 'wb+') as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)

        # Pass the file path to the ML model for prediction
        prediction = ml_model.load_model_and_predict('path/to/save/image.jpg')

        # Return API response in JSON format
        response_data = {
            'is_counterfeit': prediction == 0,
        }
        return Response(response_data)
     else:
        # Return API response with error for other request types
        response_data = {
            'error': 'Invalid request'
        }
        return Response(response_data, status=400)
# ... (your other views)
#the upload image funtion ends here
@api_view(['POST'])
def loginApi(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.get(name=username)

        if user.password == password:
            print("ok")
            request.session['user'] = user.name
            print(request.session['user'])
            return Response({'status': 1})
        else:
            print("this happened")
            return Response({'status': 2})
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        print("done")
        # Create a new user and save to the database
        user = User(name=username, email=email, password=password)
        user.save()
        
        return Response({'status': 5})
@api_view(['GET'])
def hello(request):
    if request.method=="GET":
       print("yes")
       train_model()
       ml_model.check()
       return JsonResponse({'status': 5})
    returnJsonResponse({'status': 4})    
#the csrf function
def getCsrf(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})    