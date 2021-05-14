import hashlib as hasher


class Block:
        # each block needs an index, timestamp, the transaction data, previous block hash and new hash
    def ___init___(self, index, timestamp, data, previous_hash, hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data 
        self.previous_hash = previous_hash
        self.hash = self.hash_block()

    def hash_block(self):
        # combine all the data into a string, then hash to create the new hash
        createString = str(self.index) + str(self.timestamp) + str(self.data) + str(self.previous_hash)
        sha = hasher.sha256()
        sha.update(createString.encode('utf-8'))
        return sha.hexdigest()
