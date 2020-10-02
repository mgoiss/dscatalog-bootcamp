package com.dvsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dvsuperior.dscatalog.dto.CategoryDTO;
import com.dvsuperior.dscatalog.entities.Category;
import com.dvsuperior.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository reposytory;
	
	//Metodo responsável por pegar todoas as categorias no banco
	@Transactional(readOnly = true) //Essa Another vai fazer com que a transação siga as PROPRIEDADE ASSINCRONA (onde ou faz tudo ou não faz nd)
	public List<CategoryDTO> findAll() {
		List<Category> list = reposytory.findAll();
		
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());		
	}
	
} 
