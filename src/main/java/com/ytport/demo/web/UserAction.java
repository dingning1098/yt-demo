package com.ytport.demo.web;


import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.Role;
import com.ytport.demo.entity.User;
import com.ytport.demo.service.RoleService;
import com.ytport.demo.service.UserService;
import com.ytport.util.SecurityUtil;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import java.util.List;

@Namespace("/")
public class UserAction extends BaseAction<User> {

    @Autowired
    private RoleService roleService;

    private List<Role> roleList;

    /**
     * 返回选择角色信息的公用页面
     * @return
     */
    public String selectHtml(){
        return "select";
    }

    public String searchUser(){
        List<PropertyFilter> filters = PropertyFilter.buildFromHttpRequest(Struts2Utils.getRequest());
        return ajaxPageResult(baseService.searchUser(page,filters));
    }

    public List<Role> getCanAuthorizeRoles() {
        User user = (User) SecurityUtil.getUser();
        return roleService.searchCanAuthorizeRoles(user);
    }

    public String changePwd(){
        baseService.changePwd(entity);
        return ajaxResult();
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    /*==============================框架代码START==============================*/
    private UserService baseService;
    private List<User> entityList;

    @Autowired
    public void setBaseService(UserService value) {
        super.setBaseService(value);
        this.baseService = value;
    }

    public void setEntity(User entity) {
        this.entity = entity;
    }

    public User getEntity() {
        return entity;
    }

    @Override
    public List<User> getEntityList() {
        return entityList;
    }

    public void setEntityList(List<User> entityList) {
        this.entityList = entityList;
    }
    /*==============================框架代码END==============================*/
}