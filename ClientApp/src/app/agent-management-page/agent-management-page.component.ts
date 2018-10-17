import { Component, OnInit } from '@angular/core';
import { AgentManagementService } from '../agent-management.service';
import { Agent } from '../../data/models/domain/agent';

@Component({
  selector: 'app-agent-management-page',
  templateUrl: './agent-management-page.component.html',
  styleUrls: ['./agent-management-page.component.scss']
})
export class AgentManagementPageComponent implements OnInit {
  agents: Agent[];
  pendingAgents: Agent[];
  constructor(private agentMgmtService: AgentManagementService) { }

  ngOnInit() {
    this.onAgentsUpdated();
  }

  onAgentsUpdated() {
    this.agentMgmtService.getAgentAccounts().subscribe(agents => this.agents = agents);
    this.agentMgmtService.getPendingAccounts().subscribe(agents => this.pendingAgents = agents);
  }
}
