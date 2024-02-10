import { FC, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";
import { Node } from "./type";
import { CONST } from "./constant";
import { getSubItems } from "./util";

const RenderChildNodes: FC<Node[] | undefined> = (props) => {
  return (
    <>
      {props &&
        props.map((item, index) => {
          return (
            <li key={index}>
              <TreeView
                title={item.title}
                type={item.type}
                childNodes={item.childNodes}
              />
            </li>
          );
        })}
    </>
  );
};

const RenderFolder: FC<Node> = (props) => {
  const [isExpanded, setExpanded] = useState(false);

  const nodeSelectedHandler = () => {
    setExpanded(!isExpanded);
  };

  useEffect(() => {
    return () => {
      props.childNodes = getSubItems();
    };
  }, [isExpanded, props]);

  return (
    <div>
      <div onClick={nodeSelectedHandler}>
        {isExpanded ? (
          <FaChevronDown className="icon-down" />
        ) : (
          <FaChevronRight className="icon-right" />
        )}
        {isExpanded ? (
          <FaFolderOpen className="icon-folder" />
        ) : (
          <FaFolder className="icon-folder" />
        )}
        <a>{props.title}</a>
      </div>
      <ul style={isExpanded ? {} : { display: "none" }}>
        {RenderChildNodes(props.childNodes)}
      </ul>
    </div>
  );
};

const RenderFile: FC<Node> = (props) => {
  const fileSelectedHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.setAttribute("class", "activeNode");
  };

  return (
    <div onClick={fileSelectedHandler}>
      <FaFileAlt className="icon-file" />
      <a>{props.title}</a>
    </div>
  );
};

const RenderNode: FC<Node> = (props) => {
  return props.type === CONST.ITEM_TYPE_FOLDER
    ? RenderFolder(props)
    : RenderFile(props);
};

const TreeView: FC<Node> = ({ ...props }) => {
  const [node] = useState<Node>(props);
  return <div className="treeview">{RenderNode(node)}</div>;
};

const Explorer: FC<{ title: string }> = (props) => {
  return <TreeView title={props.title} type={CONST.ITEM_TYPE_FOLDER} />;
};

export default Explorer;
