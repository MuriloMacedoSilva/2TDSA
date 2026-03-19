#!/bin/bash

# 1. Definição de Variáveis (Ajuste se quiser nomes diferentes)
RG_NAME="MTL"
LOCATION="northcentralus"
VM_NAME="VM_MTL"
VM_SIZE="Standard_B2als_v2"
IMAGE="Ubuntu2204"
ADMIN_USER="thiago"
APP_PORT=8080

echo " Iniciando provisionamento automático da DimDim..."

# 2. Criar Grupo de Recursos
az group create --name $RG_NAME --location $LOCATION -o table

# 3. Criar VM com instalação automática do Java (cloud-init)
echo " Criando Máquina Virtual e instalando Java..."
az vm create \
  --resource-group $RG_NAME \
  --name $VM_NAME \
  --location $LOCATION \
  --image $IMAGE \
  --size $VM_SIZE \
  --admin-username $ADMIN_USER \
  --generate-ssh-keys \
  --public-ip-sku Standard \
  --custom-data "#cloud-config
package_update: true
packages:
  - openjdk-17-jre-headless
runcmd:
  - mkdir -p /home/$ADMIN_USER/app" \
  -o table

# 4. Abrir porta da aplicação e SSH
echo " Liberando porta $APP_PORT e SSH..."
az vm open-port --resource-group $RG_NAME --name $VM_NAME --port $APP_PORT --priority 1001 -o table

# 5. Capturar o IP Público
PUBLIC_IP=$(az vm show -d -g $RG_NAME -n $VM_NAME --query publicIps -o tsv)

# 6. Gerar o arquivo outputs.json na RAIZ (obrigatório pelo contrato)
cat <<EOF > ../outputs.json
{
  "resource_group": "$RG_NAME",
  "vm_name": "$VM_NAME",
  "public_ip": "$PUBLIC_IP",
  "app_port": $APP_PORT
}
EOF

echo " Tudo pronto! IP da VM: $PUBLIC_IP"