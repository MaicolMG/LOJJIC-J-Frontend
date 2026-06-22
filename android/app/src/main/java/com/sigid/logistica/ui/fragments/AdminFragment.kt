package com.sigid.logistica.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.sigid.logistica.R

class AdminFragment : Fragment() {
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_admin, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        view.findViewById<TextView>(R.id.text_admin).text = 
            "Panel de Administración\n\n" +
            "• Métricas de Venta\n" +
            "• Gestión de Usuarios\n" +
            "• Reportes y Auditoría\n" +
            "• Configuración del Sistema"
    }
}
