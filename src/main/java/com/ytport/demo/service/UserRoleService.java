package com.ytport.demo.service;



import com.ytport.base.service.BaseService;
import com.ytport.demo.entity.UserRole;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional(readOnly = true)
public interface UserRoleService extends BaseService<UserRole,String>{

    /**
     * 删除某一用户的全部角色
     * @param userId
     */
    void deleteUserRole(String userId);
}

