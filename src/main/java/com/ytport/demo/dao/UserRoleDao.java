package com.ytport.demo.dao;

import com.ytport.base.dao.BaseDao;
import com.ytport.demo.entity.UserRole;
import org.springframework.stereotype.Repository;


@Repository("userRoleDao")
public class UserRoleDao extends BaseDao<UserRole, String> {

}