package com.ytport.demo.service;


import com.ytport.base.service.BaseService;
import com.ytport.demo.entity.RoleResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional(readOnly = true)
public interface RoleResourceService extends BaseService<RoleResource,String>{

}

