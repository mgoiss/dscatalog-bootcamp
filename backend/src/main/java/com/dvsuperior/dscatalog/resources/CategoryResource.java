package com.dvsuperior.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dvsuperior.dscatalog.dto.CategoryDTO;
import com.dvsuperior.dscatalog.services.CategoryService;

@RestController
@RequestMapping(value = "/categories") /*Informando a nota REST*/ 
public class CategoryResource {
	
	@Autowired
	private CategoryService service;
		
	//Metodo para retornar os dados
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll() {
		List<CategoryDTO> list = service.findAll(); //Pegando os dados no banco por meio do medo findAll

		return ResponseEntity.ok().body(list); //Retornando a lista na requisição
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) {
		CategoryDTO dto = service.findById(id); //Pegando os dados no banco por meio do medo findAll

		return ResponseEntity.ok().body(dto); //Retornando a lista na requisição
	}
}
