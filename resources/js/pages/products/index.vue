<template>
  <div>
    Products:
    <v-simple-table>
      <!-- #region Header -->
      <thead>
        <tr>
          <th class="text-center">
            Action
          </th>
          <th class="text-center">
            <v-icon>mdi-image-outline</v-icon>
          </th>
          <th>Name</th>
          <th class="text-center">
            SKU
          </th>
          <th class="text-center">
            Price
          </th>
          <th class="text-center">
            Bundle
          </th>
          <th class="text-center">
            Date
          </th>
        </tr>
      </thead>
      <!-- #endregion Header -->

      <!-- #region Body -->
      <tbody>
        <template v-for="product in products">
          <!-- #region Product -->
          <tr :key="product.id" @click="openBundleTree(product)">
            <td width="80" class="hover-shower px-0">
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
            <td width="1">
              <v-img :src="product.image" width="40" />
            </td>
            <td><strong>{{ product.name }}</strong></td>
            <td class="text-center">
              {{ product.sku }}
            </td>
            <td class="text-center">
              ${{ product.price }}
            </td>
            <td class="text-center">
              <v-icon v-if="product.is_bundle" color="green">
                mdi-check-bold
              </v-icon>
            </td>
            <td class="text-center" :inner-html.prop="product.created_at | date" />
          </tr>
          <!-- #endregion Product -->

          <!-- #region Bundle Tree Subproducts -->
          <tr v-if="bundleTree === product" :key="'bundle-' + product.id">
            <td colspan="2" />
            <td colspan="100%">
              <v-icon>mdi-file-tree</v-icon>
              <span class="overline">Subproducts</span>

              <v-treeview :items="product.products" dense hoverable>
                <template v-slot:prepend="{ item }">
                  <img :src="item.image" style="width: 32px !important;">
                </template>
              </v-treeview>
            </td>
          </tr>
          <!-- #endregion Bundle Tree Subproducts -->
        </template>
      </tbody>
      <!-- #endregion Body -->
    </v-simple-table>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',

  middleware: 'auth',

  data: () => ({
    products: require('./products.json'),
    bundleTree: null
  }),

  methods: {
    openBundleTree (product) {
      if (!product.is_bundle) {
        return
      }

      if (this.bundleTree === product) {
        this.bundleTree = null
      } else {
        this.bundleTree = product
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-shower > * {
  display: none;
}
tr:hover .hover-shower > * {
  display: inline-block;
}
</style>
