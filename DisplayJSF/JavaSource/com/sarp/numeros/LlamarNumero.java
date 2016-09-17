package com.sarp.numeros;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

@ManagedBean(name = "llamarNumero")
@SessionScoped
public class LlamarNumero {

	private String puesto;
	private String hora;
	private String numero;

	public String getPuesto() {
		return puesto;
	}

	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public void llamarProximo() {
		
		try {
			
			ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
			String path = ec.getRealPath("/blobs/geoturnosD5.txt");
			
			BufferedReader in = new BufferedReader(new FileReader(path));
			//PrintWriter writer = new PrintWriter("the-file-name.txt","UTF-8");
			
			String line;
			boolean found = false;
			String nuevoArchivo = "";
			while ((line = in.readLine()) != null) {
				String[] parteLine = line.split("\\*");
				if(parteLine[4].equals(this.puesto)){
					nuevoArchivo = nuevoArchivo + "|260216123226*4*5*ATRIL*"+this.puesto+"*D*Juan*5*"+this.hora+"*"+this.numero+"\n";
					found = true;
				}else{
					nuevoArchivo = nuevoArchivo + line + "\n";					
				}
			}

			File file = new File(path);
			PrintWriter writer = new PrintWriter(file);
			writer.print(nuevoArchivo);
			if(!found){
				writer.println("|260216123226*4*5*ATRIL*"+this.puesto+"*D*Juan*5*"+this.hora+"*"+this.numero);
			}
			writer.close();
			in.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

}
