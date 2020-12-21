import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import {actionCreators } from './store';
import { IconFontStyle } from '../../statics/iconfont/iconfont';


import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    Addition,
    Button
} from './style';
import { bindActionCreators } from 'redux';

const Header = (props) => {
        return(
            <HeaderWrapper>
                <IconFontStyle />
                <Logo />
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                     <span class="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <Transition
                           in={props.focused}
                           timeout={200}
                           classNames="slide"
                        >
                            <NavSearch 
                            className={props.focused ? 'focused' : ''}
                            onFocus={props.handleInputFocus}
                            onBlur={props.handleInputBlur}
                            ></NavSearch>
                        </Transition>
                        <span className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe612;</span>
                    </SearchWrapper>
                   
                </Nav>
                <Addition>

                    <Button className='writting'>
                        <span class="iconfont" >&#xe642;</span>
                        写文章
                        </Button>
                    <Button className='reg'>注册</Button>
                </Addition>

            </HeaderWrapper>
        )
}
const mapStateToProps = (state) => {
    return {
        focused: state.header.focused
    }
}

const mapDispathToProps = (dispath) => {
    return {
        handleInputFocus(){
            dispath(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispath(actionCreators.searchBlur());
        }
        
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Header);