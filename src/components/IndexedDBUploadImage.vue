<template>
    <div style="margin: auto">
        <div>
            <span>Pilih Gambar Dari File</span>
        </div>

        <div v-if="imageSource != null && showImage">
            <div>
                <img :src="imageSource"
                     width="500"
                     height="500"
                     style="object-fit: contain"
                />
            </div>

            <div>
                <button @click="deleteImage">Hapus Gambar</button>
            </div>
        </div>

        <div>
            <div>
                <input ref="imageInput"
                       type="file"
                       accept="image/*"
                       @change="onImageInput"
                />
            </div>

            <div v-if="imageStored">
                <button @click="readImage">Show Selected Image</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

// references
const imageInput = ref(null);

// IndexedDB Connection
const dbName = "simple_image_database";
const objectStoreName = "uploaded_images";
const openIndexedDBConnection = (accessType) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 4);

        request.onsuccess = (event) => {
            const db = event.target.result
            const dbTrx = db.transaction(objectStoreName, accessType)
            dbTrx.oncomplete = () => {
                console.log("trx completed");
                db.close();
            };

            resolve(dbTrx.objectStore(objectStoreName));
        };

        request.onerror = (event) => {
            reject("Error opening database:", event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(objectStoreName, { keyPath: "id"});
            objectStore.createIndex("file", "file", {unique: true});
        };
    })
}

// Image File CRUD
const showImage = ref(false);
const imageStored = ref(false);
const imageSource = ref(null);

const onImageInput = (e) => {
    const selectedImage = e.target.files[0];

    if (!imageStored.value) {
        addImage(selectedImage);
    } else {
        updateImage(selectedImage);
    }
}

const addImage = (image) => {
    const newObjectUrl = URL.createObjectURL(image);
    console.log("ADD: " + newObjectUrl);

    openIndexedDBConnection("readwrite")
        .then((imageStorage) => {
            const addRequest = imageStorage.add({"id": 1, "file": newObjectUrl});

            addRequest.onsuccess = (event) => {
                console.log("Data added successfully");
                imageStored.value = true;
            };

            addRequest.onerror = (event) => {
                console.error("Error adding data", event.target.error);
                imageInput.value.value = null;
            };
        })
        .catch((error) => {
            console.log(error);
            imageInput.value.value = null;
        });
}

const readImage = () => {
    console.log("Reading Stored Images");

    openIndexedDBConnection("readonly")
        .then((customerObjectStore) => {
            const customersCursor = customerObjectStore.openCursor();

            customersCursor.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    console.log('image.value:', cursor.value)
                    const storedImage = cursor.value;
                    if (storedImage != null) {
                        console.log('image url:', storedImage.file)
                        imageSource.value = storedImage.file;
                        imageStored.value = true;
                        showImage.value = true;
                    }
                    cursor.continue();
                }
            };

            customersCursor.onerror = (event) => {
                console.error("Error reading data", event.target.error);
            };
        })
}

const updateImage = (image) => {
    const updateObjectUrl = URL.createObjectURL(image);
    console.log("UPDATE: " + updateObjectUrl);

    openIndexedDBConnection("readwrite")
        .then((customerObjectStore) => {
            const updateRequest = customerObjectStore.put({"id": 1, "file": updateObjectUrl});

            updateRequest.onsuccess = (event) => {
                console.log("Data updated successfully");
                showImage.value = false;
            };

            updateRequest.onerror = (event) => {
                console.error("Error updating data", event.target.error);
            };
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteImage = () => {
    openIndexedDBConnection("readwrite")
        .then((deleteObjectStore) => {
            const deleteRequest = deleteObjectStore.delete(1);

            deleteRequest.onsuccess = (event) => {
                console.log("Data deleted successfully");
                imageSource.value = null;
                imageStored.value = false;
                showImage.value = false;
                imageInput.value.value = null;
            };

            deleteRequest.onerror = (event) => {
                console.error("Error deleting data", event.target.error);
            };
        })
}

onMounted(() => {
    deleteImage();
})
</script>
