#!/bin/bash
# Script de provisionamento Azure CLI

# Variáveis (ajuste conforme necessário)
RESOURCE_GROUP="rg-challenge-brazil"
VM_NAME="vm-challenge-java"
LOCATION="brazilsouth"

echo "Provisionando infraestrutura na Azure..."

# 1. Criar Grupo de Recursos
az group create --name $RESOURCE_GROUP --location $LOCATION

# 2. Criar VM Linux (utilizando D2s_v3 que geralmente tem mais disponibilidade)
az vm create \
  --resource-group $RESOURCE_GROUP \
  --name $VM_NAME \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --size Standard_D2s_v3 \
  --generate-ssh-keys || exit 1

# 3. Abrir Portas (8080 para API, 81/9090 para H2)
az vm open-port --resource-group $RESOURCE_GROUP --name $VM_NAME --port 8080
az vm open-port --resource-group $RESOURCE_GROUP --name $VM_NAME --port 81
az vm open-port --resource-group $RESOURCE_GROUP --name $VM_NAME --port 9090

# 4. Instalar Docker e Ferramentas
az vm run-command invoke \
  --resource-group $RESOURCE_GROUP \
  --name $VM_NAME \
  --command-id RunShellScript \
  --scripts "sudo apt-get update && sudo apt-get install -y docker.io docker-compose git nano && sudo systemctl start docker && sudo systemctl enable docker && sudo usermod -aG docker azureuser"

echo "Infraestrutura provisionada com sucesso!"
