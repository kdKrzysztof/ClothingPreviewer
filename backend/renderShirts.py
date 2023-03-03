'''
Render program here is an fixed code of user diramazioni on GitHub. https://gist.github.com/diramazioni/9255292
I've fixed this by replacing some of elements in variables, as blender python docs changed.
It is not a fully working program, I need to get variables based on sent texture name, not already set one.
I need to work on a single python file, yet we have separate for pants and shirts...
I don't know python, yet I managed to get this thing working, based on my programming experience and bpy docs and some tutorials on stackoverflow. 
I think that with proper customization, blender can be a good rendering source for sandboxes.

~ Krzysiek#5558
'''
import os

cwd = os.getcwd()
backendFolder = os.path.dirname(cwd)

image_file_shirt = os.getenv('shirt') # doesnt work lol
# image_file_pants = os.getenv('pants') # doesnt work or im just stupid

if not image_file_shirt:
	image_file_shirt= backendFolder+"\\receivedFiles\\shirtsToRender.png"

shirt_obj="Shirt" # MAKE SURE TO SELECT SHIRT OBJECT NAME [Scene collection > Collection > bv model]
shirt_material="shirt" # ALSO MAKE SURE TO SELECT THE MODEL OBJECT MATERIAL NAME
 
import bpy
from bpy_extras.image_utils import load_image


bpy.ops.object.select_all(action = 'DESELECT')
bpy.data.objects[shirt_obj].select_set(True)
bpy.context.view_layer.objects.active = bpy.data.objects[shirt_obj]

image_abs = bpy.path.abspath("//%s" % image_file_shirt)

image_name = os.path.split(image_file_shirt)[1]

bImg = bpy.data.images.get(image_abs)
if not bImg:
	bImg = load_image(image_abs)

name_compat = bpy.path.display_name_from_filepath(bImg.filepath)

material_tree = bpy.data.materials[shirt_material].node_tree
links = material_tree.links

texture = bpy.data.textures.get(name_compat)
if not texture:
	texture = material_tree.nodes.new('ShaderNodeTexImage')
	texture.image = bImg
	texture.show_texture = True
	texture.name = name_compat 

principled = material_tree.nodes.get('Principled BSDF') # basically the main node of object, you put texture on that.
links.new(texture.outputs[0], principled.inputs[0]) # Links existing texture to base color of an model object