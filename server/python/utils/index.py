import os
import math
import tensorflow as tf
from utils.data import Data


class Cnn:
    def __init__(self):
        self.define_path()

    def run(self):
        """
        main method to run the CNN
        """
        self.get_data()
        self.define_graph()
        self.runtf()

    def runtf(self):
        init = tf.global_variables_initializer()
        with tf.Session() as sess:
            sess.run([self.loss, self.accuracy, self.train_op],
                     feed_dict={})

    def define_graph(self):
        """
        build the computing graph and run
        """
        x = tf.placeholder(tf.float32, [None, 3072])
        y = tf.placeholder(tf.int64, [None])
        w = tf.get_variable('w', [x.get_shape()[-1]],
                            initializer=tf.random_normal_initializer(0, 1))
        b = tf.get_variable('b', [1],
                            initializer=tf.constant_initializer(0.0))

        y_ = tf.matmul(x, w) + b
        p_y_1 = tf.nn.sigmoid(y_)
        y_reshaped = tf.reshape(y, (-1, 1))
        y_reshaped_float = tf.cast(y_reshaped, tf.float32)

        # loss func
        loss = tf.reduce_mean(tf.square(y_reshaped_float - p_y_1))

        predict = p_y_1 > 0.5
        correct_prediction = tf.equal(tf.cast(predict, tf.int64), y_reshaped)
        accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float64))

        with tf.name_scope('train_op'):
            train_op = tf.train.AdamOptimizer(math.exp(-3)).minimize(loss)
        self.loss = loss
        self.accuracy = accuracy
        self.train_op = train_op

    def define_path(self):
        """
        define the paths of training data and test data
        """
        cifar_path = './cifar-10'
        self.train_path = [os.path.join(cifar_path, 'data_batch_%d' % i) for i in range(1, 6)]
        self.test_path = [os.path.join(cifar_path, 'test_batch')]

    def get_data(self):
        """
        get training data and test data
        """
        self.train_data = Data(self.train_path, need_shuffle=True).get()
        self.test_data = Data(self.test_path).get()
