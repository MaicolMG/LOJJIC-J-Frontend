package com.sigid.logistica.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.sigid.logistica.R

class LogisticaFragment : Fragment() {
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_logistica, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        view.findViewById<TextView>(R.id.text_logistica).text = 
            "Panel de Operaciones Logísticas\n\n" +
            "• Gestión de Stock\n" +
            "• Control de Inventario\n" +
            "• Reportes de Bodega"
    }
}
