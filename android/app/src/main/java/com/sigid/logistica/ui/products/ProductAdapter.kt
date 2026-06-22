package com.sigid.logistica.ui.products

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.data.model.Product

class ProductAdapter(
    private val onProductClick: (Product) -> Unit
) : ListAdapter<Product, ProductAdapter.ProductViewHolder>(ProductDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_product, parent, false)
        return ProductViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = getItem(position)
        holder.bind(product)
    }
    
    inner class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName: TextView = itemView.findViewById(R.id.tvProductName)
        private val tvSku: TextView = itemView.findViewById(R.id.tvProductSku)
        private val tvPrice: TextView = itemView.findViewById(R.id.tvProductPrice)
        private val tvStock: TextView = itemView.findViewById(R.id.tvProductStock)
        private val tvCategory: TextView = itemView.findViewById(R.id.tvProductCategory)
        
        fun bind(product: Product) {
            tvName.text = product.nombre
            tvSku.text = "SKU: ${product.sku}"
            tvPrice.text = "$${product.precio}"
            tvStock.text = "Stock: ${product.stock}"
            tvCategory.text = product.categoria ?: "Sin categoría"
            
            itemView.setOnClickListener {
                onProductClick(product)
            }
        }
    }
    
    class ProductDiffCallback : DiffUtil.ItemCallback<Product>() {
        override fun areItemsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem == newItem
        }
    }
}
