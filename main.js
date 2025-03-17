class HashMap {
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.loadFactor = 0.75;
        this.buckets = new Array(capacity).fill(null);
        this.size = 0;
        this._keys = []; 
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.size > this.capacity * this.loadFactor) this.resize();

        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[index] === null) {
            this.buckets[index] = [[key, value]];
            this._keys.push(key); 
            this.size++;
        } else {
            const bucket = this.buckets[index];
            const existingIndex = bucket.findIndex(([k]) => k === key);
            if (existingIndex !== -1) {
                bucket[existingIndex][1] = value;
            } else {
                bucket.push([key, value]);
                this._keys.push(key); 
                this.size++;
            }
        }
    }

    resize() {
        console.log("Resizing....");
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null);

        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== null) {
                this.buckets[i].forEach(([key, value]) => {
                    const newIndex = this.hash(key);
                    if (newBuckets[newIndex] === null) {
                        newBuckets[newIndex] = [[key, value]];
                    } else {
                        newBuckets[newIndex].push([key, value]);
                    }
                });
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
        console.log(`Current capacity is ${this.capacity}`);
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket !== null) {
            const pair = bucket.find(([k]) => k === key);
            return pair ? pair[1] : null;
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        return bucket !== null && bucket.some(([k]) => k === key);
    }

    length() {
        return this.size;
    }

    clear() {
        this.size = 0;
        this.buckets.fill(null);
        this._keys = [];
    }

    keys() {
        return this._keys;
    }

    values() {
        return this.buckets
            .filter(bucket => bucket !== null)
            .flatMap(bucket => bucket.map(([_, value]) => value));
    }

    entries() {
        const pairs = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket !== null) {
                bucket.forEach(([key, value]) => {
                    pairs.push([key, value]);
                });
            }
        }
        return pairs;
    }
}


const test = new HashMap(16);
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.capacity);
console.log(test.buckets);