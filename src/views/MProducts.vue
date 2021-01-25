<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center"></div>
        <!-- 商品列表 -->
        <h3 class="d-inline-block">Products list</h3>
        <button class="btn btn-primary float-right" @click="addNew()">
          Add Products
        </button>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr class="font-weight-bold">
                <td>Name</td>
                <td>Price</td>
                <td>Modify</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.name">
                <td>
                  {{ product.name }}
                </td>
                <td>
                  {{ product.price }}
                </td>
                <td>
                  <button
                    class="btn btn-primary m-1"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger m-1"
                    @click="deleteProduct(product)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 新增、修改商品視窗(Modal) -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- 點擊Add Products按鈕=>出現Add Product -->
            <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">
              Add Product
            </h5>
            <!-- 點擊Edit按鈕=>出現Edit Product -->
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">
              Edit Product
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8">
                <!-- 商品價格 product name -->
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <!-- 商品描述 product description -->
                <div class="form-group">
                  <vue-editor v-model="product.description"></vue-editor>
                </div>
              </div>

              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <!-- 商品價格 product price -->
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>

                <!-- 商品標籤 product tag -->
                <div class="form-group">
                  <input
                    @keyup.51="addTag"
                    type="text"
                    placeholder="Product tags ex:sale#"
                    v-model="tag"
                    class="form-control"
                  />
                  <!-- 標籤顯示區 -->
                  <div class="d-flex flex-wrap">
                    <div
                      class="mt-3 mr-2"
                      v-for="(tag, index) in product.tags"
                      :key="index"
                    >
                      <div class="tag-wrap">
                        <span class="p-1 border">{{ tag }}</span>
                        <span class="delete-tag" @click="deleteTag(tag, index)"
                          >X</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 商品圖 product image -->
                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>
                <!-- 圖片顯示區 -->
                <div class="form-group d-flex flex-wrap">
                  <div
                    class="p-1"
                    v-for="(image, index) in product.images"
                    :key="index"
                  >
                    <div class="img-wrap">
                      <img :src="image" alt="" width="80px" />
                      <span
                        class="delete-img"
                        @click="deleteImage(image, index)"
                        >X</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <!-- 新增商品時出現Save changes -->
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Save changes
            </button>
            <!-- 修改商品時出現Apply changes -->
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../Firebase";
export default {
  name: "Mproducts",
  components: {
    VueEditor,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        // 不只一項因此存成陣列
        tags: [],
        images: [],
      },
      // modal預設null，點擊新增或修改商品時，依據傳入的modal為'new'或'edit'，判斷出現的視窗內容
      modal: null,
      tag: null,
    };
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
  methods: {
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      };
    },
    addNew() {
      // modal=new，按鈕內容為Save changes
      this.modal = "new";
      // 清空之前輸入的商品資訊
      this.reset();
      // 新增商品視窗出現
      $("#product").modal("show");
    },
    editProduct(product) {
      // modal=edit，按鈕內容為Apply changes
      this.modal = "edit";
      // 將已輸入的商品資訊帶入
      this.product = product;
      // 更新視窗出現
      $("#product").modal("show");
    },
    addProduct() {
      //新增資料
      this.$firestore.products.add(this.product);
      //新增成功通知
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      //更新視窗隱藏
      $("#product").modal("hide");
    },
    updateProduct() {
      // 更新資料
      this.$firestore.products.doc(this.product.id).update(this.product);
      //更新成功通知
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      //更新視窗隱藏
      $("#product").modal("hide");
    },
    deleteProduct(doc) {
      //提醒是否要刪除
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          //刪除資料
          // this.$firestore.products.doc(doc['.key']).delete()
          this.$firestore.products.doc(doc.id).delete();
          //刪除成功通知
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    addTag() {
      //console.log('pressing comma');
      //按下,會得到該筆tag資料存到product資料中的tags
      this.product.tags.push(this.tag);
      //清空已回傳的tag
      this.tag = "";
    },
    uploadImage(e) {
      // 如果有收到資料
      if (e.target.files[0]) {
        //console.log(e.target.files[0]);

        let file = e.target.files[0];
        //指定上傳路徑:以file.name的名稱存到storage的products資料夾
        //給一隨機數字後可上傳相同檔名之圖片
        var storageRef = fb
          .storage()
          .ref("products/" + file.name + "_" + Math.random());
        //上傳圖檔
        let uploadTask = storageRef.put(file);
        //即時更新
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // console.log('File available at', downloadURL); downloadURL為路徑
              // this.product.image= downloadURL; ->單一檔案  push->多檔，存成陣列
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },
    deleteImage(img, index) {
      //storageRef = fb.storage().ref('products/'+ file.name); 上傳路徑
      let image = fb.storage().refFromURL(img);
      // 從images陣列中依索引編號移除一項資料(這一指令可放後面=>因執行時間短放前面)
      this.product.images.splice(index, 1);
      // 刪除image
      image
        .delete()
        .then(function () {
          //console.log('image deleted');
        })
        .catch(function (error) {
          //console.log('an error occurred');
        });
    },
    deleteTag(tag, index) {
      // 從tags陣列中依索引編號移除一項資料(這一指令可放後面=>因執行時間短放前面)
      this.product.tags.splice(index, 1);
      // 刪除tag
      tag
        .delete()
        .then(function () {
          console.log("tag deleted");
        })
        .catch(function (error) {
          console.log("an error occurred");
        });
    },
  },
};
</script>

<style scoped lang="scss">
.img-wrap {
  position: relative;
}
.img-wrap span.delete-img {
  position: absolute;
  top: -15px;
  left: -3px;
}
.img-wrap span.delete-img:hover {
  cursor: pointer;
}

.tag-wrap {
  position: relative;
}
.tag-wrap span.delete-tag {
  position: absolute;
  top: -15px;
  left: -3px;
}
.tag-wrap span.delete-tag:hover {
  cursor: pointer;
}
</style>