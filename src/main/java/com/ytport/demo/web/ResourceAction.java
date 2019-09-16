package com.ytport.demo.web;


import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.Resource;
import com.ytport.demo.service.ResourceService;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import java.util.List;

@Namespace("/")
public class ResourceAction extends BaseAction<Resource> {

	public String searchAllTree() {
		List<PropertyFilter> filters = PropertyFilter
				.buildFromHttpRequest(Struts2Utils.getRequest());
		return ajaxResult(baseService.searchAllTree(filters));
	}

	private String autoCheckParent;
	/**
	 * 返回选择资源的公用页面
	 * @return
	 */
	public String selectHtml(){
		return "select";
	}

	private String userId;

	/**
	 * 返回某一个用户所拥有的权限列表
	 * @return
	 */
	public String searchUserResList(){
		return ajaxResult(baseService.searchUserResList(userId));
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAutoCheckParent() {
		return autoCheckParent;
	}

	public void setAutoCheckParent(String autoCheckParent) {
		this.autoCheckParent = autoCheckParent;
	}

	/*==============================框架代码START==============================*/
	private ResourceService baseService;
	private List<Resource> entityList;
	@Autowired
	public void setBaseService(ResourceService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(Resource entity) {
		this.entity=entity;
	}
	
	public Resource getEntity() {
		return entity;
	}

	@Override
	public List<Resource> getEntityList() {
		return entityList;
	}

	public void setEntityList(List<Resource> entityList) {
		this.entityList = entityList;
	}

	/*==============================框架代码END==============================*/
}