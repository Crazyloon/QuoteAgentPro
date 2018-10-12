import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Agent } from '../../data/models/domain/agent';
import { AccountStatus } from '../../data/constants/enumerations/accountStatus';

@Component({
  selector: 'app-agent-management-list',
  templateUrl: './agent-management-list.component.html',
  styleUrls: ['./agent-management-list.component.scss']
})
export class AgentManagementListComponent implements OnInit {
  @Input() agents: Agent[];
  @Input() pendingAgents: Agent[];
  @Output() credentialsListChange = new EventEmitter<Agent[]>();
  enabledAgents: Agent[];
  constructor() { }

  ngOnInit() {
  }

  onEnableAgentToggle($event: Event, id: string): void {
    console.log("Enabled Toggled");
    const checkBox: HTMLInputElement = ($event.target || $event.srcElement || $event.currentTarget) as HTMLInputElement;
    let checked = checkBox.checked;
    let agent: Agent;
    if (checked) {
      agent = this.agents.find((a: Agent) => a.id == id);
      agent.accountStatus = AccountStatus.enabled;
    }

  }

  onPromoteAgentToggle($event: Event, id: string) {
    const checkBox: HTMLInputElement = ($event.target || $event.srcElement || $event.currentTarget) as HTMLInputElement;
    let checked = checkBox.checked;
    let agent: Agent;
    if (checked) {
      agent = this.agents.find((a: Agent) => a.id == id);
    }
  }

  toggleEnableAll() {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.enabled');
    const enabledCheckBoxes: HTMLInputElement[] = Array.from(checkBoxes);
    enabledCheckBoxes.forEach(cb => {
      if (!cb.checked) {
        cb.click();
      }
    });
  }

  approveChanges() {

  }
}

// add each userid to the list of changes
// for each user id change their accountStatus 
