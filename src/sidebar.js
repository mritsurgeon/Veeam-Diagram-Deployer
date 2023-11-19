import React from 'react';
import LinProxyPIcon from './icons/LINPROXYP.svg';
import LinProxyVMIcon from './icons/LINPROXYVM.svg';
import WinRepoPIcon from './icons/WINREPOP.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import LinRepoVMIcon from './icons/LINREPOVM.svg';
import VEMPIcon from './icons/VEMP.svg';
import VONEVMIcon from './icons/VONEVM.svg';
import WinProxyPIcon from './icons/WINPROXYP.svg';
import WinRepoVMIcon from './icons/WINREPOVM.svg';
import LinRepoPIcon from './icons/LINREPOP.svg';
import VBRVMIcon from './icons/VBRVM.svg';
import VONEPIcon from './icons/VONEP.svg';
import WinProxyVMIcon from './icons/WINPROXYVM.svg';
import VEMVMIcon from './icons/VEMVM.svg';
import VCENTERIcon from './icons/VCENTER.svg';
import HYPEVIcon from './icons/HYPEVCLUST.svg';

export default () => {
  const onDragStart = (event, nodeType, nodeName) => {
    const data = JSON.stringify({ nodeType, nodeName });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const NodeButton = styled(Button)({
    margin: '8px',
    width: '200px',
    padding: '16px',
    textTransform: 'none', 
  });


      return (
    <Box component="aside" className="sidebar">
<Typography variant="h6" gutterBottom style={{ color: 'Black', fontSize: '18px'}}>
  Drag these nodes to the Canvas on the Left.
</Typography>
      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Physical Linux Proxy')}
        draggable
      >
        <img src={LinProxyPIcon} alt="Physical Linux Proxy Icon" className="node-icon" />
        Physical Linux Proxy
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'output', 'Virtual Linux Repository')}
        draggable
      >
        <img src={LinRepoVMIcon} alt="Virtual Linux Repository Icon" className="node-icon" />
        Virtual Linux Repository
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Physical Veeam Enterprise Manager ')}
        draggable
      >
        <img src={VEMPIcon} alt="Physical Veeam Entwrprise Manager Icon" className="node-icon" />
        Physical Enterprise Manager 
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Virtual Veeam One')}
        draggable
      >
        <img src={VONEVMIcon} alt="Virtual Veeam One Icon" className="node-icon" />
        Virtual Veeam One
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Physical Veeam One')}
        draggable
      >
        <img src={VONEPIcon} alt="Physical Veeam One Icon" className="node-icon" />
        Physical Veeam One
      </NodeButton>

      <NodeButton
        className="dndnode output"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'output', 'Windows Physical Repository')}
        draggable
      >
        <img src={WinRepoPIcon} alt="Windows Physical Repository Icon" className="node-icon" />
        Windows Physical Repository
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Virtual Linux Proxy')}
        draggable
      >
        <img src={LinProxyVMIcon} alt="Virtual Linux Proxy Icon" className="node-icon" />
        Virtual Linux Proxy
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'output', 'Virtual Windows Repository')}
        draggable
      >
        <img src={WinRepoVMIcon} alt="Virtual Windows Repository Icon" className="node-icon" />
        Virtual Windows Repository
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'output', 'Linux Repository Physical')}
        draggable
      >
        <img src={LinRepoPIcon} alt="Linux Repository Physical Icon" className="node-icon" />
        Linux Repository Physical
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Virtual Veeam Backup & Replication')}
        draggable
      >
        <img src={VBRVMIcon} alt="Virtual Veeam Backup & Replication Icon" className="node-icon" />
        Virtual Backup & Replication
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Virtual Veeam Enterprise Manager')}
        draggable
      >
        <img src={VEMVMIcon} alt="Virtual Veeam Enterprise ManagerIcon" className="node-icon" />
        Virtual Enterprise Manager
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Windows Proxy Physical')}
        draggable
      >
        <img src={WinProxyPIcon} alt="Windows Proxy Physical Icon" className="node-icon" />
        Windows Proxy Physical
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Virtual Windows Proxy')}
        draggable
      >
        <img src={WinProxyVMIcon} alt="Virtual Windows Proxy Icon" className="node-icon" />
        Virtual Windows Proxy
      </NodeButton>

      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Vmware Vcenter')}
        draggable
      >
        <img src={VCENTERIcon} alt="VMwaer VCENTER Icon" className="node-icon" />
        VMware VCENTER
      </NodeButton>
      
      <NodeButton
        className="dndnode"
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'default', 'Hyper V')}
        draggable
      >
        <img src={HYPEVIcon} alt="Hyper V Icon" className="node-icon" />
        Hyper V
      </NodeButton>
    </Box>
  );
};
