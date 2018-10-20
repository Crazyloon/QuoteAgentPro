import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Agent } from '../../../data/models/domain/agent';
import { AgentManagementService } from '../../services/agent-management.service';

@Component({
  selector: 'app-pending-agents-list',
  templateUrl: './pending-agents-list.component.html',
  styleUrls: ['./pending-agents-list.component.scss']
})
export class PendingAgentsListComponent implements OnInit {
  @Input() pendingAgents: Agent[];
  @Output() onAgentsUpdated = new EventEmitter();
  agentsToActivate: string[] = [];
  isOperationSuccessful: boolean = false;
  constructor(private agentManager: AgentManagementService) { }

  ngOnInit() {
  }

  onCheckPendingAgent($event: Event, id: string) {
    const checkBox: HTMLInputElement = ($event.target || $event.srcElement || $event.currentTarget) as HTMLInputElement;
    if (checkBox.checked) {
      this.agentsToActivate.push(id);
    } else {
      const index = this.agentsToActivate.findIndex(i => i == id);
      if (index > -1) {
        this.agentsToActivate.splice(index, 1);
      }
    }
  }

  onCheckAllPendingAgents() {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.pending');
    const enabledCheckBoxes: HTMLInputElement[] = Array.from(checkBoxes);
    enabledCheckBoxes.forEach(cb => {
      if (!cb.checked) {
        cb.click();
      }
    });
  }

  onApplyChanges() {
    this.agentManager.activateAgents(this.agentsToActivate)
      .subscribe(success => {
        this.isOperationSuccessful = success === false ? false : true;
        this.agentsToActivate = [];
        this.onAgentsUpdated.emit();
        setTimeout(() => {
          this.isOperationSuccessful = false;
        }, 2000);
      });
  }

}
