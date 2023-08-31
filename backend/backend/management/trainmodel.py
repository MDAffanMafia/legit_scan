# imageupload/management/commands/trainmodel.py

from django.core.management.base import BaseCommand
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

class Command(BaseCommand):
    help = 'Trains the counterfeit detection model'

    def handle(self, *args, **kwargs):
        # Load and preprocess the dataset for training and validation
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        train_data_dir = os.path.join(BASE_DIR, 'basedata', 'training')
        validation_data_dir = os.path.join(BASE_DIR, 'basedata', 'validation')
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
        
        model.fit(
            train_generator,
            steps_per_epoch=train_generator.samples // batch_size,
            epochs=num_epochs,
            validation_data=validation_generator,
            validation_steps=validation_generator.samples // batch_size
        )

        # Save the trained model
        model_path = os.path.join(BASE_DIR, 'counterfeit_model.h5')
        model.save(model_path)

        self.stdout.write(self.style.SUCCESS('Model training completed and model saved as "counterfeit_model.h5".'))
Command.handle()