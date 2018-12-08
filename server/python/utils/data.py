# author : rehellinen
import pickle
import numpy as np


class Data:
    def __init__(self, paths, need_shuffle=False):
        self.paths = paths
        self.need_shuffle = need_shuffle

        # load all data according to the paths
        self.load()
        self.count = self.data.shape[0]
        self.indicator = 0

    def get(self):
        """
        main method (return the processed data)
        """
        self.shuffle()
        return self.data

    def load(self):
        """
        load all data
        """
        all_data = []
        all_labels = []
        for path in self.paths:
            with open(path, 'rb') as f:
                origin_data = pickle.load(f, encoding='bytes')
                data = origin_data[b'data']
                labels = origin_data[b'labels']
                for item, label in zip(data, labels):
                    if label in [0, 1]:
                        all_data.append(item)
                        all_labels.append(label)

        self.data = np.vstack(all_data)
        self.labels = np.hstack(all_labels)

    def shuffle(self):
        """
        shuffle the data
        """
        if not self.need_shuffle:
            return
        p = np.random.permutation(self.count)
        self.data = self.data[p]
        self.labels = self.labels[p]

    def next_batch(self, batch_size):
        end_indicator = self.indicator + batch_size
        if batch_size > self.count:
            raise Exception('batch size is larger than all examples')
        if end_indicator > self.count:
            if self.need_shuffle:
                self.shuffle()
                self.indicator = 0
                end_indicator = batch_size
            else:
                raise Exception('have no more examples')

        batch_data = self.data[self.indicator: end_indicator]
        batch_labels = self.labels[self.indicator: end_indicator]
        self.indicator = end_indicator
        return batch_data, batch_labels
