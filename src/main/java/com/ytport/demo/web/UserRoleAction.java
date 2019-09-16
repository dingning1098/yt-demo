package com.ytport.demo.web;


import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.UserRole;
import com.ytport.demo.service.UserRoleService;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
public class UserRoleAction extends BaseAction<UserRole> {

	/*==============================框架代码START==============================*/
	private UserRoleService baseService;
	private List<UserRole> entityList;
	@Autowired
	public void setBaseService(UserRoleService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(UserRole entity) {
		this.entity=entity;
	}
	
	public UserRole getEntity() {
		return entity;
	}

	@Override
	public List<UserRole> getEntityList() {
		return entityList;
	}

	public void setEntityList(List<UserRole> entityList) {
		this.entityList = entityList;
	}
	/*==============================框架代码END==============================*/
}