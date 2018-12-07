# author : rehellinen
import tensorflow as tf
import os
from utils.data import Data

# define path
CIFAR_DIR = './cifar-10'
train_path = [os.path.join(CIFAR_DIR, 'data_batch_%d' % i) for i in range(1, 6)]
test_path = [os.path.join(CIFAR_DIR, 'test_batch')]

# get data set
train_data = Data(train_path, need_shuffle = True).get()
test_data = Data(test_path).get()
print(test_data)



#
#
# def load_data(filename):
#     """read data from cifar-10"""
#     with open(filename, 'rb') as f:
#         data = pickle.load(f, encoding='bytes')
#         return data['data'], data['labels']
#
# x = tf.placeholder(tf.float32, [None, 3072])
# y = tf.placeholder(tf.int64, [None])
#
# w = tf.get_variable('w', [x.get_shape()[-1], 1],
#                     initializer=tf.random_normal_initializer(0, 1))
# b = tf.get_variable('b', [1],
#                     initializer=tf.constant_initializer(0.0))
#
# y_ = tf.matmul(x, w) + b
# p_y_1 = tf.nn.sigmoid(y_)
# y_reshaped = tf.reshape(y, (-1, 1))
# y_reshaped_float = tf.cast(y_reshaped, tf.float32)
#
# loss = tf.reduce_mean(tf.square(y_reshaped_float - p_y_1))
# predict = p_y_1 > 0.5
# predict = tf.cast(predict, tf.int64)
# correct_prediction = tf.equal(predict, y_reshaped)
# accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float64))
#
# with tf.name_scope('train_op'):
#     train_op = tf.train.AdamOptimizer('le-3').minimize(loss)
#
# init = tf.global_variables_initializer()
#
# with tf.Session() as sess:
#     sess.run([loss, accuracy, train_op], feed_dict={})
