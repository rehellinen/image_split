import os
import math
import tensorflow as tf
from utils.data import Data


class Cnn:
    def __init__(self):
        self.get_data()

    def run(self):
        """
        main method to run the CNN
        """
        self.define_graph()
        self.runtf()

    def runtf(self):
        init = tf.global_variables_initializer()
        batch_size = 20
        train_steps = 100000
        with tf.Session() as sess:
            sess.run(init)
            for i in range(train_steps):
                batch_data, batch_labels = self.train_data.next_batch(batch_size)
                loss_val, accuracy_val, _ = sess.run(fetches=[self.loss, self.accuracy, self.train_op],
                                                  feed_dict={
                                                      self.x: batch_data,
                                                      self.y: batch_labels
                                                  })
                if (i+1) % 500 == 0:
                    print('[Train step:%d, loss:%4.5f, accuracy:%4.5f]' % (i+1, loss_val, accuracy_val))

    def define_graph(self):
        """
        build the computing graph and run
        """
        self.x = tf.placeholder(tf.float32, [None, 3072])
        self.y = tf.placeholder(tf.int64, [None])
        w = tf.get_variable('w', [self.x.get_shape()[-1], 1],
                            initializer=tf.random_normal_initializer(0, 1))
        b = tf.get_variable('b', [1],
                            initializer=tf.constant_initializer(0.0))

        y_ = tf.matmul(self.x, w) + b
        p_y_1 = tf.nn.sigmoid(y_)
        y_reshaped = tf.reshape(self.y, (-1, 1))
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

    def get_data(self):
        """
        get training data and test data
        """
        cifar_path = './cifar-10'
        train_path = [os.path.join(cifar_path, 'data_batch_%d' % i) for i in range(1, 6)]
        test_path = [os.path.join(cifar_path, 'test_batch')]

        self.train_data = Data(train_path, need_shuffle=True)
        self.test_data = Data(test_path)
