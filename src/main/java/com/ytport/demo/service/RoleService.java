package com.ytport.demo.service;


import com.ytport.base.service.BaseService;
import com.ytport.demo.entity.Role;
import com.ytport.demo.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional(readOnly = true)
public interface RoleService extends BaseService<Role,String>{

    /**
     * 搜索用户有权限授权的角色
     * @param user
     * @return
     */
    public List<Role> searchCanAuthorizeRoles(User user);
}

