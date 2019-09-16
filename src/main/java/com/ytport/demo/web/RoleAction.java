package com.ytport.demo.web;


import com.ytport.base.action.BaseAction;

import com.ytport.demo.entity.Resource;
import com.ytport.demo.entity.Role;
import com.ytport.demo.entity.User;
import com.ytport.demo.service.ResourceService;
import com.ytport.demo.service.RoleService;
import com.ytport.util.SecurityUtil;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Namespace("/")
public class RoleAction extends BaseAction<Role> {

	@Autowired
	private ResourceService resourceService;

	/**
	 * 返回选择角色信息的公用页面
	 * @return
	 */
	public String selectHtml(){
		return "select";
	}

	public String save() {
		return super.save();
	}

	public List<Resource> getCanAuthorizeResources(){
		User user= (User)SecurityUtil.getUser();
		return resourceService.searchCanAuthorizeResources(user);
	}

	/*==============================框架代码START==============================*/
	private RoleService baseService;
	private List<Role> entityList;
	@Autowired
	public void setBaseService(RoleService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(Role entity) {
		this.entity=entity;
	}
	
	public Role getEntity() {
		return entity;
	}

	@Override
	public List<Role> getEntityList() {
		return entityList;
	}

	public void setEntityList(List<Role> entityList) {
		this.entityList = entityList;
	}
	/*==============================框架代码END==============================*/
}