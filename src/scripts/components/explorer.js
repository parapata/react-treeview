import '../../scss/style.scss';
import React, {Component} from 'react';
import * as Const from '../constants';

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.state = {node: this.props.node};
        this.selectedNode = this.selectedNode.bind(this);
    }

    selectedNode(node) {
        this.refs.details.show(node); // 詳細画面更新
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        return (
            <div className='holyGrail'>
                <main className='content'>
                    <DetailsView node={this.state.node} ref="details"/>
                </main>
                <nav className='side-nav'>
                    <TreeView node={this.props.node} selectedNode={this.selectedNode}/>
                </nav>
            </div>
        );
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getSubItems = () => {
    switch (getRandomInt(0, 2)) {
        case 1:
            return [
                {id: 1, name: 'リーフ01', type: Const.ITEM_TYPE_FOLDER},
                {id: 2, name: 'リーフ02', type: Const.ITEM_TYPE_FOLDER}
            ];

        case 2:
            return [
                {id: 3, name: 'リーフ03', type: Const.ITEM_TYPE_FOLDER},
                {id: 4, name: 'music.aac', type: Const.ITEM_TYPE_FILE},
                {id: 5, name: 'sample.jpg', type: Const.ITEM_TYPE_FILE}
            ];

        default:
            return [
                {id: 3, name: 'リーフ03', type: Const.ITEM_TYPE_FOLDER},
                {id: 6, name: 'test.txt', type: Const.ITEM_TYPE_FILE}
            ];
    }
};

const renderFolder = (component) => {
    let children = null;
    if (component.state.children) {
        children = component.state.children.map((node, index) => {
            return (
                <li key={index}>
                    <TreeView node={node} selectedNode={component.props.selectedNode}/>
                </li>
            );
        });
    }
    let style = component.state.expanded ? {} : {display: 'none'};
    let mark = component.state.expanded ? 'fa fa-fw fa-caret-down' : 'fa fa-fw fa-caret-right';
    let icon = component.state.expanded ? 'fa fa-fw fa-folder-open' : 'fa fa-fw fa-folder';

    return (
        <div>
            <div>
                <i className={mark} onClick={() => component.clickHandler(component.props.node)}></i>
                <i className={icon} onDoubleClick={() => component.clickHandler(component.props.node)}></i>
                <a onDoubleClick={() => component.clickHandler(component.props.node)}>{component.props.node.name}</a>
            </div>
            <ul style={style}>
                {children}
            </ul>
        </div>
    );
};

const renderFile = (component) => {
    let icon = 'fa fa-fw fa-file';
    return (
        <div onClick={() => component.clickHandler(component.props.node)}>
            <i className={icon}></i>
            <a>{component.props.node.name}</a>
        </div>
    );
};

export class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            enumerated: false,
        };
    }

    clickHandler() {
        if (this.props.node.type === Const.ITEM_TYPE_FOLDER) {
            if (!this.state.enumerated) {
                this.setState({
                    enumerated: true,
                    children: getSubItems()
                });
            }
            this.setState({expanded: !this.state.expanded});
        }
        this.props.selectedNode(this.props.node);
    }

    render() {
        return this.props.node.type === Const.ITEM_TYPE_FOLDER ? renderFolder(this) : renderFile(this);
    }
}

export class DetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            node: this.props.node
        }
    }

    show(node) {
        this.setState({
            node: node
        });
    };

    render() {
        return (
            <div className='side-nav'>
                <div>ID：{this.state.node.id}</div>
                <div>ノード名：{this.state.node.name}</div>
                <div>ノートタイプ：{this.state.node.type}</div>
            </div>
        );
    }
}

export default Explorer;
