package com.ytport.demo.dao;

import com.ytport.base.dao.BaseDao;
import com.ytport.demo.entity.Role;
import org.springframework.stereotype.Repository;

@Repository("roleDao")
public class RoleDao extends BaseDao<Role, String> {

}