from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from flask_uploads import UploadSet, IMAGES
from wtforms import FloatField, BooleanField, IntegerField, RadioField, SelectField, TextAreaField, StringField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, Length


class MyInputRequired(InputRequired):
    field_flags = ()


class CupcakeForm(FlaskForm):
    """Form for adding pets"""
    images = UploadSet('images', IMAGES)

    flavor = StringField("Flavor", validators=[
        MyInputRequired(message="Flavor cannot be blank")])
    size = StringField("Size", validators=[
                       MyInputRequired(message="Size cannot be blank")])
    rating = FloatField("Rating", validators=[
        Optional(), NumberRange(min=1, max=10, message=("Please enter a valid rating from 1 to 10"))])
    image = StringField("Cupcake Image URL", validators=[
        Optional(strip_whitespace=True,), URL(message="Please enter a valid URL")])
    # image_upload = FileField('Image Upload', validators=[
    #     Optional(), FileAllowed(images, 'Only images are allowed')])

    # def validate(self):
    #     valid = True
    #     if not FlaskForm.validate(self):
    #         valid = False
    #     if not self.image and not self.image_upload:
    #         self.image.errors.append(
    #             "Cupcake Image URL or Cupcake Image Upload required")
    #         valid = False
    #     else:
    #         return valid
