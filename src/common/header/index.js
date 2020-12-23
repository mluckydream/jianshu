import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import {actionCreators } from './store';
import { IconFontStyle } from '../../statics/iconfont/iconfont';
import { bindActionCreators } from 'redux';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    NavSearch,
    Addition,
    Button
} from './style';

class Header extends Component {
    getListArea (){
        const { focused, list } = this.props;
        if(focused){
            return (
                <SearchInfo>
                     <SearchInfoTitle>
                     热门搜索
                         <SearchInfoSwitch>
                            换一批
                         </SearchInfoSwitch>
                         <SearchInfoList>
                             {
                                 list.map((item) => {
                                     return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                                 })
                             }
                        </SearchInfoList>                     
                     </SearchInfoTitle>               
                </SearchInfo>
            )
        }else {
            return null;
        }
    }

    render(){
        const { focused, handleInputFocus, handleInputBlur } = this.props;
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
                           in={focused}
                           timeout={200}
                           classNames="slide"
                        >
                            <NavSearch 
                            className={focused ? 'focused' : ''}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            ></NavSearch>
                        </Transition>
                        <span className={focused ? 'focused iconfont' : 'iconfont'}>&#xe612;</span>
                        {this.getListArea()}
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
} 


const mapStateToProps = (state) => {
    return {
        // 老版本
        // focused: state.getIn(['header', 'focused']),
        // list: state.getIn(['header', 'list'])
        
        // 新版本
        focused: state.header.getIn(['focused']),
        list: state.header.getIn(['list'])
    }
}

const mapDispathToProps = (dispath) => {
    return {
        handleInputFocus(){
            dispath(actionCreators.getList());
            dispath(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispath(actionCreators.searchBlur());
        }
        
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Header);