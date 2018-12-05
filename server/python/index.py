# author : rehellinen
import tensorflow as tf
import pickle
import numpy as np
import os

CIFAR_DIR = './'

a = tf.constant(1)

with tf.Session() as sess:
   b = sess.run(a)
   print(b)
# print(1)

