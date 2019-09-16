package com.ytport.demo.service;

import com.ytport.base.service.BaseService;
import com.ytport.demo.entity.Resource;
import com.ytport.demo.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;

import java.util.List;

@Component
@Transactional(readOnly = true)
public interface UserService extends BaseService<User,String>{


    /**
     * 搜索用户所属菜单
     * @param user
     * @return
     */
    List<Resource> searchUserMenus(User user);


    /**
     * 根据角色代码，搜索用户列表，即搜索具有某一角色的用户
     * @param roleCode
     * @return
     */
    List<User> searchByRoleCode(String roleCode);

    /**
     * 修改用户密码
     * @param entity
     */
    void changePwd(User entity);

    /**
     * 根据登录名搜索用户
     * @param loginName
     * @return
     */
    User findByLoginName(String loginName);

    /**
     * 用于用户管理主界面对用户信息进行搜索
     * @param page
     * @param filters
     * @return
     */
    Page searchUser(Page<User> page, List<PropertyFilter> filters);

    List<User> searchUser(List<PropertyFilter> filters);
}

