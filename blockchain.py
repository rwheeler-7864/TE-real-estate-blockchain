
# https://101blockchains.com/build-a-blockchain-in-python/

from block import Block
import datetime as date

class Blockchain(object):
    def __init__(self):
        self.blockchain = []
        self.current_transactions = []
        self.new_block(previous_hash=1, proof=100)

        def new_block(self, proof, previous_hash=None):
            # creates new blocks then adds to chain

            Block.___init___(self, len(self.chain)+1, date.datetime.now(), data, previous_hash,)

            block = {
                'index': len(self.chain) + 1,
                'timestamp': time(),
                'proof': proof,
                'previous_hash': previous_hash or self.hash(self.chain[-1]),
            }

            self.current_transactions=[]
            self.chain.append(block)
            return block


        def new_transaction(self):
            # adds new transactions to existing transactions
            self.current_transactions.append(
                {
                    'address': address,
                    'vendor_details': vendor_details,
                    'design': design,
                    'license_number': license_number,
                }
            )
            return self.last_block['index'] + 1
            

        @staticmethod
        def hash(block):
            #used to hash block
            block_string = json.dumps(block, sort_keys=True).encode()
            return hashlib.sha256(block_string).hexdigest()
        
        @property
        def last_block(self):
            #calls and returns last block in chain
            return self.chain[-1]
        



        def proof_of_work(self, last_proof):
            #consensus algo
            proof = 0
            while self.valid_proof(last_proof, proof) is False:
                proof +=1
            return proof

        @staticmethod
        def valid_proof(last_proof, proof):
            #validates the block
            guess = f'{last_proof}{proof}'.encode()
            guess_hash = hashlib.sha256(guess).hexigest()
            return guess_hash[:4] == '0000'