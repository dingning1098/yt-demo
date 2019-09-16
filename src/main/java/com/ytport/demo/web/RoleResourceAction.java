package com.ytport.demo.web;


import com.ytport.base.action.BaseAction;

import com.ytport.demo.entity.RoleResource;
import com.ytport.demo.service.RoleResourceService;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
public class RoleResourceAction extends BaseAction<RoleResource> {

	/*==============================框架代码START==============================*/
	private RoleResourceService baseService;
	private List<RoleResource> entityList;
	@Autowired
	public void setBaseService(RoleResourceService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(RoleResource entity) {
		this.entity=entity;
	}
	
	public RoleResource getEntity() {
		return entity;
	}

	@Override
	public List<RoleResource> getEntityList() {
		return entityList;
	}

	public void setEntityList(List<RoleResource> entityList) {
		this.entityList = entityList;
	}
	/*==============================框架代码END==============================*/
}