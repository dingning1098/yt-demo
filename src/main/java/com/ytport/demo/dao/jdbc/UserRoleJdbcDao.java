package com.ytport.demo.dao.jdbc;


import com.ytport.base.dao.jdbc.JdbcDao;
import com.ytport.demo.entity.UserRole;
import org.springframework.stereotype.Repository;

/**
 * 资源 JdbcDao
 * Created by xyl on 15-3-23.
 */
@Repository("userRoleJdbcDao")
public class UserRoleJdbcDao extends JdbcDao<UserRole, String> {

}
