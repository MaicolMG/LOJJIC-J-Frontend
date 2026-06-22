package com.sigid.logistica.ui.checkout

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.data.model.OrderItem

class CartAdapter(
    private val onRemove: (Int) -> Unit
) : ListAdapter<OrderItem, CartAdapter.CartViewHolder>(CartDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_cart, parent, false)
        return CartViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(item, position)
    }
    
    inner class CartViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvName: TextView = itemView.findViewById(R.id.tvCartItemName)
        private val tvPrice: TextView = itemView.findViewById(R.id.tvCartItemPrice)
        private val btnRemove: Button = itemView.findViewById(R.id.btnRemoveItem)
        
        fun bind(item: OrderItem, position: Int) {
            tvName.text = item.nombre
            tvPrice.text = "$${item.precio}"
            
            btnRemove.setOnClickListener {
                onRemove(position)
            }
        }
    }
    
    class CartDiffCallback : DiffUtil.ItemCallback<OrderItem>() {
        override fun areItemsTheSame(oldItem: OrderItem, newItem: OrderItem): Boolean {
            return oldItem.productoId == newItem.productoId
        }
        
        override fun areContentsTheSame(oldItem: OrderItem, newItem: OrderItem): Boolean {
            return oldItem == newItem
        }
    }
}
