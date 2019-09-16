package com.ytport.demo.service;


import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoNation;
import com.ytport.base.service.BaseService;

@Component
@Transactional(readOnly = true)
public interface DemoNationService extends BaseService<DemoNation,String>{
	
}

